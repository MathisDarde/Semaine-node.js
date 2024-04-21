const prisma = require("../config/prisma");

class PostsController {
  async index(req, res) {
    const posts = await prisma.post.findMany();
    return res.status(200).send(posts);
  }

  async store(req, res) {
    try {
      const body = req.body;
      const post = await prisma.post.create({
        data: body,
      });
      return res.status(201).send(post);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async show(req, res) {
    try {
      const id_post = req.params.id;
      const result = await prisma.post.findUnique({
        where: {
          id: parseInt(id_post),
        },
      });

      if (id_post === undefined) {
        return res.status(404).send("Post not found !");
      }

      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async update(req, res) {
    try {
      const id_post = req.params.id;
      const body = req.body;
      const post = await prisma.post.update({
        where: { id: parseInt(id_post) },
        data: body,
      });

      if (id_post === undefined) {
        return res.status(404).send("Post not found !");
      }

      post = body;
      return res.status(200).send(post);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const id_post = req.params.id;
      const post = await prisma.post.delete({
        where: { id: parseInt(id_post) },
      });

      if (id_post === undefined) {
        return res.status(404).send("Post not found !");
      }

      return res.status(204);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
}

module.exports = new PostsController();
