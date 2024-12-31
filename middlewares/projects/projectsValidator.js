const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

//Internal Import
const Project = require("../../model/project");

const addProjectValidator = [
  check("title")
    .isLength({ min: 1 })
    .withMessage("ফিল্ডটি খালি থাকা যাবে না!")
    .custom((value) => {
      if (/\d/.test(value)) {
        throw createError("কোনো সংখ্যা ব্যবহার করা যাবে না!");
      }
      return true;
    })
    .trim(),
  check("owner")
    .isLength({ min: 1 })
    .withMessage("ফিল্ডটি খালি থাকা যাবে না!")
    .custom((value) => {
      if (/\d/.test(value)) {
        throw createError("কোনো সংখ্যা ব্যবহার করা যাবে না!");
      }
      return true;
    })
    .trim(),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("সঠিক ফরম্যাটে মোবাইল নম্বর দিন। উদাহরণ: +8801XXXXXXXXX")
    .custom(async (value) => {
      try {
        const owner = await Project.findOne({ mobile: value });
        if (owner) {
          throw createError("এই মোবাইল নম্বরটি ইতিমধ্যেই ব্যবহৃত হয়েছে।");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("address")
    .isLength({ min: 5 })
    .withMessage("ঠিকানাটি অন্তত ৫ অক্ষর দীর্ঘ হতে হবে।")
    .matches(/^[\u0980-\u09FF0-9\s,.-]+$/)
    .withMessage(
      "ঠিকানায় শুধুমাত্র বাংলা অক্ষর, সংখ্যা, স্পেস, কমা, এবং ড্যাশ ব্যবহার করা যাবে।"
    ),
  check("earn")
    .isLength({ min: 1 })
    .withMessage(
      "এই ফিল্ডটি খালি থাকা যাবে না। আপনি কত টাকা এই প্রজেক্ট থেকে আয় করেছেন, তা জানান।"
    )
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage(
      "অনুগ্রহ করে সঠিক সংখ্যার মান দিন। উদাহরণ: 12345.67 অথবা 12345"
    ),
];

const addProjectValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
  //   // response the errors
  //   res.status(500).json({
  //     errors: mappedErrors,
  //   });
};

module.exports = { addProjectValidator, addProjectValidationHandler };
