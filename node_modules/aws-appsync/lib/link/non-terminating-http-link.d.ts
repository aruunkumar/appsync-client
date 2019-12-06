/*!
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { FetchOptions } from 'apollo-link-http';
import { NonTerminatingLink } from './non-terminating-link';
export declare class NonTerminatingHttpLink extends NonTerminatingLink {
    constructor(contextKey: string, options: FetchOptions);
}
