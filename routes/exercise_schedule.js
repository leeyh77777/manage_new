const express = require("express");
const schedule = require("../models/schedule");
const { alert } = require("../lib/common");
const router = express.Router();

router.use((req, res, next) => {
  res.locals.addScript = ["schedule", "layer"];
  res.locals.addCss = ["schedule"];
  next();
});

/** 스케줄 달력 */
router.get("/", async (req, res) => {
  const data = await schedule.getCalendar(req.query.year, req.query.month);
  return res.render("schedule/exercise_calendar", data);
});

/** 스케줄 삭제 */
router.get("/:date", async (req, res) => {
  const result = await schedule.delete(req.params.date);
  if (result) {
    // 삭제 성공
    return res.send("<script>parent.parent.location.reload();</script>");
  }

  // 삭제 실패
  return alert("삭제 실패하였습니다.", res);
});

module.exports = router;
