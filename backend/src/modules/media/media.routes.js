import express, { Router } from "express";
import { authenticateAdmin } from "../../middleware/admin-auth.js";
import { postImage, removeImage } from "./media.controller.js";

export const mediaRouter = Router();
mediaRouter.post(
  "/media/images",
  authenticateAdmin,
  express.raw({ type: ["image/jpeg", "image/png", "image/webp"], limit: "8mb" }),
  postImage,
);
mediaRouter.delete("/media/images", authenticateAdmin, removeImage);
