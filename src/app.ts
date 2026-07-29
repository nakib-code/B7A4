import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";

import config from "./config";

import { AdminRoutes } from "./modules/Admin/admin.route";
import { AuthRoutes } from "./modules/Auth/auth.route";
import { BookingRoutes } from "./modules/booking/booking.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { PaymentRoutes } from "./modules/payment/payment.route";
import { ReviewRoutes } from "./modules/review/review.route";
import { ServiceRoutes } from "./modules/service/service.route";
import { TechnicianRoutes } from "./modules/Technician/technician.route";

import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      config.app_url,
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FixItNow API Running",
  });
});

app.use("/api/auth", AuthRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/technician", TechnicianRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/services", ServiceRoutes);
app.use("/api/payments", PaymentRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/reviews", ReviewRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
