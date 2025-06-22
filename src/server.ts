import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const port = process.env.PORT || 5000

async function main() {
    try {
        // cVt9tofTnEoVPDIo
        // library_management_system
        await mongoose.connect(`mongodb+srv://library_management_system:cVt9tofTnEoVPDIo@cluster0.wueeg5w.mongodb.net/library_management_system?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('conneteddddddddddddddddddd')
        server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main()