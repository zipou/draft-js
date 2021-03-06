/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorProps
 * @flow
 */

'use strict';

import type ContentBlock from 'ContentBlock';
import type {DraftBlockRenderMap} from 'DraftBlockRenderMap';
import type {DraftDragType} from 'DraftDragType';
import type {DraftEditorCommand} from 'DraftEditorCommand';
import type {DraftHandleValue} from 'DraftHandleValue';
import type {DraftInlineStyle} from 'DraftInlineStyle';
import type {DraftTextAlignment} from 'DraftTextAlignment';
import type EditorState from 'EditorState';
import type SelectionState from 'SelectionState';
import type {BidiDirection} from 'UnicodeBidiDirection';

export type DraftEditorProps = {
  /**
   * The two most critical props are `editorState` and `onChange`.
   *
   * The `editorState` prop defines the entire state of the editor, while the
   * `onChange` prop is the method in which all state changes are propagated
   * upward to higher-level components.
   *
   * These props are analogous to `value` and `onChange` in controlled React
   * text inputs.
   */
  editorState: EditorState,
  onChange: (editorState: EditorState) => void,

  // specify editorKey when rendering serverside. If you do not set this prop
  // react will complain that there is a server/client mismatch because Draft
  // will generate a random editorKey when rendering in each context. The key
  // is used to figure out if content is being pasted within a draft block to
  // better apply formatting and styles.  If two editors share the same key &
  // `stripPastedStyles` is false, draft will assume both editors share their
  // styling and formatting when re-applying styles.
  editorKey?: string,

  placeholder?: string,

  // Specify whether text alignment should be forced in a direction
  // regardless of input characters.
  textAlignment?: DraftTextAlignment,

  // Specify whether text directionality should be forced in a direction
  // regardless of input characters.
  textDirectionality?: BidiDirection,

  // For a given `ContentBlock` object, return an object that specifies
  // a custom block component and/or props. If no object is returned,
  // the default `DraftEditorBlock` is used.
  blockRendererFn?: (block: ContentBlock) => ?Object,

  // Function that returns a cx map corresponding to block-level styles.
  blockStyleFn?: (block: ContentBlock) => string,

  // A function that accepts a synthetic key event and returns
  // the matching DraftEditorCommand constant, or a custom string,
  // or null if no command should be invoked.
  keyBindingFn: (e: SyntheticKeyboardEvent) => ?string,

  // Set whether the `DraftEditor` component should be editable. Useful for
  // temporarily disabling edit behavior or allowing `DraftEditor` rendering
  // to be used for consumption purposes.
  readOnly?: boolean,

  // Note: spellcheck is always disabled for IE. If enabled in Safari, OSX
  // autocorrect is enabled as well.
  spellCheck?: boolean,

  // Set whether to remove all style information from pasted content. If your
  // use case should not have any block or inline styles, it is recommended
  // that you set this to `true`.
  stripPastedStyles?: boolean,

  tabIndex?: number,

  // exposed especially to help improve mobile web behaviors
  autoCapitalize?: string,
  autoComplete?: string,
  autoCorrect?: string,

  ariaActiveDescendantID?: string,
  ariaAutoComplete?: string,
  ariaControls?: string,
  ariaDescribedBy?: string,
  ariaExpanded?: boolean,
  ariaHasPopup?: boolean,
  ariaLabel?: string,
  ariaMultiline?: boolean,

  webDriverTestID?: string,

  /**
   * Cancelable event handlers, handled from the top level down. A handler
   * that returns `handled` will be the last handler to execute for that event.
   */

  // Useful for managing special behavior for pressing the `Return` key. E.g.
  // removing the style from an empty list item.
  handleReturn?: (
    e: SyntheticKeyboardEvent,
    editorState: EditorState,
  ) => DraftHandleValue,

  // Map a key command string provided by your key binding function to a
  // specified behavior.
  handleKeyCommand?: (
    command: DraftEditorCommand | string,
    editorState: EditorState,
  ) => DraftHandleValue,

  // Handle intended text insertion before the insertion occurs. This may be
  // useful in cases where the user has entered characters that you would like
  // to trigger some special behavior. E.g. immediately converting `:)` to an
  // emoji Unicode character, or replacing ASCII quote characters with smart
  // quotes.
  handleBeforeInput?: (
    chars: string,
    editorState: EditorState,
  ) => DraftHandleValue,

  handlePastedText?: (
    text: string,
    html?: string,
    editorState: EditorState,
  ) => DraftHandleValue,

  handlePastedFiles?: (files: Array<Blob>) => DraftHandleValue,

  // Handle dropped files
  handleDroppedFiles?: (
    selection: SelectionState,
    files: Array<Blob>
  ) => DraftHandleValue,

  // Handle other drops to prevent default text movement/insertion behaviour
  handleDrop?: (
    selection: SelectionState,
    dataTransfer: Object,
    isInternal: DraftDragType
  ) => DraftHandleValue,

  /**
   * Non-cancelable event triggers.
   */
  onEscape?: (e: SyntheticKeyboardEvent) => void,
  onTab?: (e: SyntheticKeyboardEvent) => void,
  onUpArrow?: (e: SyntheticKeyboardEvent) => void,
  onDownArrow?: (e: SyntheticKeyboardEvent) => void,

  onBlur?: (e: SyntheticEvent) => void,
  onFocus?: (e: SyntheticEvent) => void,

  // Provide a map of inline style names corresponding to CSS style objects
  // that will be rendered for matching ranges.
  customStyleMap?: Object,

  // Provide a function that will construct CSS style objects given inline
  // style names.
  customStyleFn?: (style: DraftInlineStyle, block: ContentBlock) => ?Object,

  // Provide a map of block rendering configurations. Each block type maps to
  // an element tag and an optional react element wrapper. This configuration
  // is used for both rendering and paste processing.
  blockRenderMap: DraftBlockRenderMap,
};

export type DraftEditorDefaultProps = {
  blockRenderMap: DraftBlockRenderMap,
  blockRendererFn: (block: ContentBlock) => ?Object,
  blockStyleFn: (block: ContentBlock) => string,
  keyBindingFn: (e: SyntheticKeyboardEvent) => ?string,
  readOnly: boolean,
  spellCheck: boolean,
  stripPastedStyles: boolean,
};
