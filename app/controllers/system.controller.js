const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

exports.find_formula = async (req, res) => {
  const { formula, input_array, mode } = req.body;

  const find_previous_formula = await prisma.formula.findFirst({
    where: {
      formula: formula,
      mode: mode,
      formula_input: {
        every: {
          OR: Object.keys(input_array).map((key) => {
            return {
              input_word: key,
              value: input_array[key],
            };
          }),
        },
      },
    },
    include: {
      formula_input: true,
      formula_result: true,
    },
  });

  if (find_previous_formula) {
    res.status(200).send({
      find_previous_formula: find_previous_formula,
      status: true,
    });
  } else {
    res.status(200).send({
      status: false,
    });
  }
};

exports.save_formula = async (req, res) => {
  const { formula, input_array, mode, result } = req.body;

  const find_previous_formula = await prisma.formula.findFirst({
    where: {
      formula: formula,
      mode: mode,
      formula_input: {
        every: {
          OR: Object.keys(input_array).map((key) => {
            return {
              input_word: key,
              value: input_array[key],
            };
          }),
        },
      },
    },
    include: {
      formula_input: true,
      formula_result: true,
    },
  });

  if (!find_previous_formula) {
    const create_formula = await prisma.formula.create({
      data: {
        formula: formula,
        mode: mode,
        formula_input: {
          create: Object.keys(input_array).map((key) => {
            return {
              input_word: key,
              value: input_array[key],
            };
          }),
        },
        formula_result: {
          create: Object.keys(result).map((key) => {
            return {
              result_type: key,
              value: JSON.stringify(result[key]),
            };
          }),
        },
      },
    });
  }

  res.status(200).send({
    status: true,
  });
};
