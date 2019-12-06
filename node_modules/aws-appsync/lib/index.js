"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
var client_1 = require("./client");
__export(require("./client"));
var signer_1 = require("./link/signer");
exports.Signer = signer_1.Signer;
__export(require("./helpers/offline"));
exports.default = client_1.default;
