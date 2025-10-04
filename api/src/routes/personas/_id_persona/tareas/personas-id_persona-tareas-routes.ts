import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Persona } from "../../../../model/persona.ts";
import { Type } from "@fastify/type-provider-typebox";
import { findPersonById } from "../../../../services/personas.ts";
import { updatePerson, deletePersonById } from "../../../../services/personas.ts";
const personasRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
fastify.get(
    "/",
    {
      schema: {
        tags: ["tareas"],
        params: Type.Pick(Persona, ["id_persona"]),
        response: {
          200: Persona,
        },
      },
    },
    async function (req, rep) {
      return findPersonById(req.params.id_persona);
    }
  );

  fastify.put(
      "/",
      {
        schema: {
          tags: ["tareas"],
          params: Type.Pick(Persona, ["id_persona"]),
          body: Type.Pick(Persona, ["username", "roles"], {
            examples: [
              {
                username: "userCambiado",
                roles: ["normal"],
              },
            ],
          }),
          response: {
            204: Type.Null(),
          },
        },
      },
      async function (req, rep) {
        rep.code(204);
        return updatePerson(
          req.params.id_persona,
          req.body.username,
          req.body.roles
        );
      }
    );

  fastify.delete(
    "/",
    {
      schema: {
        tags: ["tareas"],
        params: Type.Pick(Persona, ["id_persona"]),
        response: {
          204: Type.Null(),
        },
      },
    },
    async function (req, rep) {
      rep.code(204);
      return deletePersonById(req.params.id_persona);
    }
  );
};
export default personasRoutes;
