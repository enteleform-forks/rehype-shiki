/**
 * Copyright 2022 Pranav Karawale
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Parent } from 'unist-util-modify-children';
import { Highlighter } from 'shiki';
interface Config {
    highlighter: Highlighter;
}
/**
 * Rehype plugin to highlight code blocks using Shiki.
 * @param {Config} config The configuration for the plugin
 */
export default function shiki({ highlighter }: Config): (tree: Parent) => void;
export {};
