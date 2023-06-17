"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const common_1 = require("@nestjs/common");
exports.Context = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const req = request;
    return req.headers;
});
//# sourceMappingURL=context.decorator.js.map