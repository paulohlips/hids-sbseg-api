import Rules from "../models/Rules";

class RulesController {
    // GET
    async index(req, res) {
        try {
            if (req.query.rule) {
                const rules = await Rules.find({
                    name: { $all: req.query.rule },
                });

                return res.status(200).json(rules);
            }

            const rules = await Rules.find();
            return res.status(200).json(rules);
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    // POST
    async store(req, res) {
        const { name } = req.body;
        console.log(req.io);
        const verification = await Rules.findOne({ name });

        if (verification) {
            return res.status(400).json({ message: "Rule already exists" });
        }
        try {
            const rule = await Rules.create(req.body);

            //req.io.emit("tweet", tweet);

            return res.status(201).json(req.body);
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    // PUT
    async update(req, res) {
        const RuleToUpdate = await Rules.findOne({
            id: req.params.id,
        });

        if (!RuleToUpdate) {
            return res
                .status(400)
                .json({ error: "Rule requested doesn't exists." });
        }

        const rule = await Rules.update(req.body);

        return res.status(201).json({ message: "Updated!" });
    }

    // DELETE
    async delete(req, res) {
        const RulesToDelete = await Rules.findOne({
            id: req.params.id,
        });

        if (!RulesToDelete) {
            return res.status(400).json({ error: "Rule doesn't exists." });
        }

        const result = await Rules.deleteOne({ id: req.params.id });

        return res.status(204).json({ message: "Rule has been deleted." });
    }
}

export default new RulesController();
