export const calls = {
    main: async () => await request(server).get("/tasks").send(),
    unique: async () => await request(server).get("/tasks/1").send(),
    details: async () => await request(server).get("/tasks/details").send(),
    unique_details: async () => await request(server).get("/tasks/details/1").send(),
}