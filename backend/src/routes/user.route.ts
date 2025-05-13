/**
 * user routes
 * /api/users/<route>
 */

import express from "express";

const router = express.Router();

router.get("/:id");

/**
 * TODO
 *
 * view profile: id
 * update profile: id
 * check if username available (for updating profile): username
 * delete account: id
 * get followers: id
 * get following: id
 */
