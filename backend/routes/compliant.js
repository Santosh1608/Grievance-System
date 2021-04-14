const router = require("express").Router();
const Compliant = require("../models/Compliant");
const User = require("../models/User");
const {
  isSignedIn,
  isCustomer,
  isAdmin,
  haveRightsForCompliant,
  isDeveloper,
} = require("../middleware/auth");
router.param("compliantId", async (req, res, next, id) => {
  try {
    let compliant = await Compliant.findById(id);
    if (!compliant) {
      throw new Error();
    }
    req.compliant = compliant;
    next();
  } catch {
    res.send({
      error: "Complaint not found",
    });
  }
});
router.param("resolvedById", async (req, res, next, id) => {
  try {
    let resolvedUser = await User.findOne({ _id: id, role: 1 });
    if (!resolvedUser) {
      throw new Error();
    }
    req.resolvedByUser = resolvedUser;
    next();
  } catch {
    res.send({
      error: "developer not found",
    });
  }
});
router.post("/addCompliant", isSignedIn, isCustomer, async (req, res) => {
  try {
    let compliant = new Compliant({
      name: req.body.name,
      desc: req.body.desc,
      createdBy: req.profile._id,
    });
    compliant = await compliant.save();
    res.send(compliant);
  } catch {
    res.status(400).send({
      error: "cannot add compliant",
    });
  }
});
router.get(
  "/getAllCompliantsForCustomer",
  isSignedIn,
  isCustomer,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({
        createdBy: req.profile._id,
      }).populate("resolvedBy", "name");
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getActiveCompliantsForCustomer",
  isSignedIn,
  isCustomer,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({
        createdBy: req.profile._id,
        status: "ACTIVE",
      });
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getSolvedCompliantsForCustomer",
  isSignedIn,
  isCustomer,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({
        createdBy: req.profile._id,
        status: "SOLVED",
      });
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getNewCompliantsForCustomer",
  isSignedIn,
  isCustomer,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({
        createdBy: req.profile._id,
        status: "NEW",
      });
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getAllCompliantsForDeveloper",
  isSignedIn,
  isDeveloper,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({
        resolvedBy: req.profile._id,
      }).populate("resolvedBy", "name");
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getActiveCompliantsForDeveloper",
  isSignedIn,
  isDeveloper,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({
        resolvedBy: req.profile._id,
        status: "ACTIVE",
      });
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getSolvedCompliantsForDeveloper",
  isSignedIn,
  isDeveloper,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({
        resolvedBy: req.profile._id,
        status: "SOLVED",
      });
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getAllCompliantsForAdmin",
  isSignedIn,
  isAdmin,
  async (req, res) => {
    try {
      const compliants = await Compliant.find().populate("resolvedBy", "name");
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getActiveCompliantsForAdmin",
  isSignedIn,
  isAdmin,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({ status: "ACTIVE" });
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getNewCompliantsForAdmin",
  isSignedIn,
  isAdmin,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({ status: "NEW" });
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);
router.get(
  "/getSolvedCompliantsForAdmin",
  isSignedIn,
  isAdmin,
  async (req, res) => {
    try {
      const compliants = await Compliant.find({ status: "SOLVED" });
      res.send(compliants);
    } catch {
      res.status(400).send({
        error: "Cannot get compliants try again later",
      });
    }
  }
);

router.put(
  "/updateCompliantByAdmin/:compliantId/:resolvedById",
  isSignedIn,
  isAdmin,
  async (req, res) => {
    try {
      if (req.resolvedByUser.cpd > 10) {
        return res.send({
          error: "Developer got tired comeback tommorow",
        });
      }
      if (req.compliant.status == "NEW") {
        req.resolvedByUser.cpd = req.resolvedByUser.cpd + 1;
        const updateCompliant = {
          resolvedBy: req.resolvedByUser._id,
          status: "ACTIVE",
        };
        const updatedCompliant = await Compliant.findByIdAndUpdate(
          req.compliant._id,
          updateCompliant,
          {
            new: true,
          }
        );
        console.log(updatedCompliant);
        await req.resolvedByUser.save();
        return res.send(updatedCompliant);
      } else {
        res.send({
          error: `Complaint already assigned to ${req.resolvedByUser.name}`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({
        error: "Cannot update compliant",
      });
    }
  }
);

router.put(
  "/updateCompliantByDeveloper/:compliantId",
  isSignedIn,
  isDeveloper,
  haveRightsForCompliant,
  async (req, res) => {
    try {
      const { desc } = req.body;
      const updateCompliant = { desc, status: "SOLVED" };
      const updatedCompliant = await Compliant.findByIdAndUpdate(
        req.compliant._id,
        updateCompliant,
        {
          new: true,
        }
      );
      res.send(updatedCompliant);
    } catch {
      res.status(400).send({
        error: "Cannot update compliant",
      });
    }
  }
);

module.exports = router;
