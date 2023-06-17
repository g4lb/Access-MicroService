"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessModule = void 0;
const common_1 = require("@nestjs/common");
const access_service_1 = require("./access.service");
const access_controller_1 = require("./access.controller");
const api_key_module_1 = require("../core/apiKey/api-key.module");
let AccessModule = class AccessModule {
};
AccessModule = __decorate([
    (0, common_1.Module)({
        imports: [api_key_module_1.ApiKeyModule],
        providers: [access_service_1.AccessService],
        controllers: [access_controller_1.AccessController],
    })
], AccessModule);
exports.AccessModule = AccessModule;
//# sourceMappingURL=access.module.js.map