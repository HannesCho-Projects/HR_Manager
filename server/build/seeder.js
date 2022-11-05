"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const config_1 = __importDefault(require("./config/config"));
const User_1 = __importDefault(require("./models/User"));
mongoose_1.default.connect(config_1.default.mongo.url);
const db = mongoose_1.default.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 10; i++) {
        const user = new User_1.default({
            username: faker_1.faker.helpers.unique(faker_1.faker.internet.userName),
            password: faker_1.faker.internet.password(),
            firstName: faker_1.faker.name.firstName(),
            lastName: faker_1.faker.name.lastName(),
            email: faker_1.faker.helpers.unique(faker_1.faker.internet.email),
            street: faker_1.faker.address.street(),
            housenumber: faker_1.faker.address.buildingNumber(),
            zipcode: parseInt(faker_1.faker.address.zipCode()),
            city: faker_1.faker.address.city(),
            country: faker_1.faker.address.country(),
            role: faker_1.faker.company.bsBuzz(),
        });
        try {
            const createdUser = yield User_1.default.create(user);
            console.log(createdUser);
        }
        catch (error) {
            console.log(error);
        }
    }
});
seed();
// npx ts-node server/seed.ts => create fake user data
