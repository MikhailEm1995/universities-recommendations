"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const ramda_1 = require("ramda");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(usersService, authService) {
        super();
        this.usersService = usersService;
        this.authService = authService;
    }
    async validate(username, password) {
        const user = await this.usersService.findOne(username);
        if (!user ||
            !(await this.authService.isPasswordCorrect(password, user.password))) {
            throw new common_1.UnauthorizedException();
        }
        return ramda_1.omit('password', user);
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.default,
        auth_service_1.default])
], LocalStrategy);
exports.default = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map