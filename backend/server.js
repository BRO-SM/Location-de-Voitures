const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// cars

app.get("/api/cars", (req, res) => {
  db.query("SELECT * FROM Cars", (err, carRows) => {
    if (err) {
      res.status(500).send("Error fetching cars");
      console.error(err);
    } else {
      // Get all car IDs
      const carIds = carRows.map(car => car.car_id);
      if (carIds.length === 0) {
        return res.json([]);
      }
      // Get all images for these cars
      db.query("SELECT * FROM imgs WHERE car_id IN (?)", [carIds], (imgErr, imgRows) => {
        if (imgErr) {
          res.status(500).send("Error fetching images");
        } else {
          // Attach images to cars
          const carsWithImages = carRows.map(car => ({
            ...car,
            images: imgRows.filter(img => img.car_id === car.car_id)
          }));
          res.json(carsWithImages);
        }
      });
    }
  });
});
app.get("/api/cars/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Cars WHERE car_id = ?", [id], (err, rows) => {
    if (err) {
      res.status(500).send("Error fetching car");
    } else {
      res.json(rows[0]);
    }
  });
});
app.get("/api/cars/:id/images", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM imgs WHERE car_id = ?", [id], (err, rows) => {
    if (err) {
      res.status(500).send("Error fetching images");
    } else {
      res.json(rows);
    }
  });
});
app.post("/api/cars", (req, res) => {
  const {
    make,
    model,
    year,
    color,
    license_plate,
    price_per_day,
    description,
    img,
  } = req.body;
  db.query(
    "INSERT INTO Cars (make, model, year, color, license_plate, price_per_day, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [make, model, year, color, license_plate, price_per_day, description],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding car");
      } else {
        const carId = result.insertId;
        if (img) {
          db.query(
            "INSERT INTO imgs (car_id, img_url, is_primary) VALUES (?, ?, ?)",
            [carId, img, true],
            (imgErr) => {
              if (imgErr) {
                res.status(500).send("Cars added but failed to add image");
              } else {
                res.status(201).send("Cars and image added successfully");
              }
            }
          );
        } else {
          res.status(201).send("Cars added successfully");
        }
      }
    }
  );
});
app.put("/api/cars/:id", (req, res) => {
  const { id } = req.params;
  const {
    make,
    model,
    year,
    color,
    license_plate,
    price_per_day,
    description,
    img,
  } = req.body;
  db.query(
    "UPDATE Cars SET make = ?, model = ?, year = ?, color = ?, license_plate = ?, price_per_day = ?, description = ? WHERE car_id = ?",
    [make, model, year, color, license_plate, price_per_day, description, id],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating car");
      } else {
        res.status(200).send("Cars updated successfully");
      }
    }
  );
});
app.post("/api/cars/:id/images", (req, res) => {
  const { id } = req.params;
  const { img } = req.body;
  db.query(
    "INSERT INTO imgs (car_id, img_url, is_primary) VALUES (?, ?, ?)",
    [id, img, false],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding image");
      } else {
        res.status(201).send("Image added successfully");
      }
    }
  );
});
app.delete("/api/cars/:id/images/:img_id", (req, res) => {
  const { id, img_id } = req.params;
  db.query(
    "DELETE FROM imgs WHERE car_id = ? AND img_id = ?",
    [id, img_id],
    (err, result) => {
      if (err) {
        res.status(500).send("Error deleting image");
      } else {
        res.status(200).send("Image deleted successfully");
      }
    }
  );
});
app.delete("/api/cars/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Cars WHERE car_id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting car");
    } else {
      res.status(200).send("Cars deleted successfully");
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
