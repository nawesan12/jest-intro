import server from "../app.js"
import request from "supertest"

// Importacion de diccionarios
import { calls } from "./_tasks_routes.js"

const newTask = {
    title: "Titulo",
    description: "Descripcion"
}

const diccionarioDeLlamadas = {
    GET_TASKS: async () => await request(server).get("/tasks").send(),
    POST_TASKS_EMPTY: async () => await request(server).post("/tasks").send({}),
    POST_TASKS_DATA: async (data) => await request(server).post("/tasks").send(data)
}



describe("Peticiones GET", () => {
    describe("Tasks", () => {

        test("All routes should respond with 200 code and being an array", async () => {
            for(const call in calls) {
                const response = await call()
                expect(response.statusCode).toBe(200)
                expect(response.body).toBeInstanceOf(Array)
            }
        })
    })

    describe("Users", () => {
        describe("Given a title and a description", () => {
            test("Should respond with a 200 status code", async () => {
                const response = await request(server).post("/tasks").send(newTask)
                expect(response.statusCode).toBe(200)
            })

            test("Should have a type of content: 'JSON'", async () => {
                const response = await diccionarioDeLlamadas.POST_TASKS_DATA(newTask)
                expect(response.type).toBe("application/json")
                //expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
            })

            test("Should respond with an object", async () => {
                const response = await diccionarioDeLlamadas.POST_TASKS_DATA(newTask)
                console.log(response.body)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body.id).toBeDefined()
            })
        })

        describe("NOT given a title and a description", () => {
            const fields = [
                {},
                {title: "titulo"},
                {description: "description"}
            ]

            for(const field of fields) {
                test("Should respond with a 400 status code", async () => {
                    const response = await request(server).post("/tasks").send(field)
                    expect(response.status).toBe(400)
                })
            }

            test("Should show what is missing", async () => {
                const response = await diccionarioDeLlamadas.POST_TASKS_DATA(fields[1])
                expect(response.status).toBe(400)

                response.body.title ? expect(response.body.title).toBeDefined() : null
                response.body.description ? expect(response.body.description).toBeDefined() : null
                console.log(response.body)
            })
        })
    })
})