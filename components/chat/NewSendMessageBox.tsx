import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Picker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { customEmojis } from './customEmojis'; // Adjust the path as necessary

import { useSession } from 'next-auth/react';

import { IRootState, useSelector } from '@/store';
import styles from './NewSendMessageBox.module.css';
import { useChatRoom } from '@/hooks/useChatRoom';

import { Dialog, DialogBackdrop } from '@headlessui/react';
import { showMessage } from '@/utils/toast';
const MAX_CHARS = 280;

var Delta = Quill.import('delta');

// Get a reference to the default Clipboard module
const Clipboard: any = Quill.import('modules/clipboard');

class CustomClipboard extends Clipboard {
    onCapturePaste(e: ClipboardEvent | any) {
        if (e.clipboardData.getData('text/html') == '') {
            e.preventDefault();

            // Get the plain text from the clipboard
            let plainText = e.clipboardData.getData('text/plain');

            // Replace newlines with spaces to make the text single line
            plainText = plainText.replace(/(\r\n|\n|\r)/gm, ' ');

            const range = this.quill.getSelection(true);
            if (range == null) return;
            // Convert the plain text into a Delta object
            const delta = this.convert({ text: plainText }, range);
            this.quill.updateContents(delta, Quill.sources.USER);
            this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
            this.quill.scrollSelectionIntoView();
        } else {
            super.onCapturePaste(e);
        }
    }
}

// Register the custom clipboard module
Quill.register('modules/clipboard', CustomClipboard, true);

const Image: any = Quill.import('formats/image') as any;
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];
class ImageBlot extends Image {
    static formats(domNode: any) {
        return ImageFormatAttributesList.reduce(function (formats: any, attribute: any) {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
    }
    format(name: any, value: any) {
        if (ImageFormatAttributesList.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }
    }
}
Quill.register(ImageBlot, true);

const NewSendMessageBox: React.FC = () => {
    const { data: session, status } = useSession();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const { isSocketConnected, sendMessage, setShouldScroll } = useChatRoom();

    const editorRef = useRef<HTMLDivElement | null>(null); // Reference for the editor
    const [showPicker, setShowPicker] = useState(false);
    const quill = useRef<Quill | null>(null); // State to hold Quill instance

    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = () => {
        if (quill.current) {
            const text = quill.current.getText();
            const characterCount = text.replace(/\n/g, '').length; // Count characters excluding newlines
            setCharacterCount(characterCount);
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            const quillInstance = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: false,
                    keyboard: {
                        bindings: {
                            // Override the Enter key behavior
                            enter: {
                                key: 'Enter', // Keycode for Enter
                                handler: function (range: any, context: any) {
                                    // Prevent default behavior
                                    return false;
                                },
                            },
                        },
                    },
                },
                placeholder: 'Enter your message here',
            });

            quill.current = quillInstance; // Store the Quill instance

            return () => {
                quillInstance.enable(false); // Clean up on unmount
            };
        }
    }, []);

    useEffect(() => {
        let singleLine = true;
        if (quill.current) {
            // Listen for text-change events
            quill.current.on('text-change', () => {
                // Check if the character limit is exceeded
                if (quill.current && quill.current.getLength() > MAX_CHARS) {
                    quill.current.deleteText(MAX_CHARS, quill.current.getLength() - MAX_CHARS);
                }
            });

            quill.current.keyboard.bindings['Enter'] = [
                {
                    key: 'Enter',
                    shiftKey: null,
                    handler: (range: any, context: any) => {
                        OnClickSendMessage(); // Now uses the latest state
                        return false;
                    },
                },
            ];

            quill.current.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
                if (singleLine) {
                    const newText = node.textContent?.replace(/(\r\n|\n|\r)/gm, ' ') ?? '';
                    const newDelta = new Delta();
                    return newDelta.insert(newText);
                }
                return delta;
            });
        }
    }, [quill, isSocketConnected]);

    const handleEmojiSelect = (emojiObject: EmojiClickData) => {
        if (quill.current) {
            // Focus the editor to ensure we can get a selection
            quill.current.focus();
            const range = quill.current.getSelection();

            if (range) {
                if (emojiObject.isCustom) {
                    const imageData = {
                        src: emojiObject.imageUrl,
                        alt: emojiObject.names[0],
                        height: '17px',
                        width: '17px',
                        // style: 'margin-top: -5px; max-width: 17px; max-height: 17px; display: inline;',
                    };

                    // Insert the styled image using the custom blot
                    quill.current.insertEmbed(range.index, 'image', emojiObject.imageUrl, Quill.sources.USER);
                    quill.current.formatText(range.index, 1, 'height', '17px');
                    quill.current.formatText(range.index, 1, 'width', '17px');
                    quill.current.formatText(range.index, 1, 'style', 'margin-top: -5px; max-width: 17px; max-height: 17px; display: inline-block;');

                    // Move the cursor to the end of the inserted image
                    quill.current.setSelection(range.index + 1, Quill.sources.SILENT); // Move cursor after the image

                    // Remove the newline if it exists
                    const nextChar = quill.current.getText(range.index + 1, 1);
                    if (nextChar === '\n') {
                        quill.current.deleteText(range.index + 1, 1, Quill.sources.USER); // Delete the newline
                    }

                    setShowPicker(false); // Close the emoji picker after selection
                } else {
                    const emojiSpan = `<span style="font-size: 20px;">${emojiObject.emoji}</span>`;
                    quill.current.clipboard.dangerouslyPasteHTML(range.index, emojiSpan);

                    // Remove the newline character if it exists
                    const nextIndex = range.index + emojiObject.emoji.length;
                    const nextChar = quill.current.getText(nextIndex, 1);
                    if (nextChar === '\n') {
                        quill.current.deleteText(nextIndex, 1, Quill.sources.USER);
                    }
                }
                setShowPicker(false);
            }
        }
    };

    const OnClickSendMessage = () => {
        if (isSocketConnected && status == 'authenticated') {
            if (quill.current) {
                const editorHtml = quill.current.getSemanticHTML();
                // if (editorHtml.trim().length === 0) return;
                const isEmpty = editorHtml.trim() === '' || editorHtml === '<p><br></p>' || editorHtml === '<p></p>';
                if (isEmpty) return; // Prevent submission if the content is empty

                sendMessage(editorHtml.trim());
                quill.current.setText(''); // Clear the editor content
                setShowPicker(false);
                setShouldScroll(true);
            }
        }
    };

    useEffect(() => {
        if (characterCount > MAX_CHARS) {
            showMessage('Character limit exceeded', 'error');
        }
    }, [characterCount]);

    return (
        <div className="flex items-center input-container w-full relative py-3">
            <div className={`w-full bg-blue-200/10 rounded-[5px] border-none`}>
                <div ref={editorRef} className={`${styles.editor} flex-grow text-blue-200 text-base font-semibold`} />
            </div>
            <button type="button" className="flex items-center justify-center" onClick={() => setShowPicker((prev) => !prev)}>
                <span className="icon-emoji text-base text-blue-200 absolute right-12" />
            </button>

            <button className="absolute right-4" onClick={OnClickSendMessage}>
                <span className="icon-send text-sm text-blue-200"></span>
            </button>

            <Dialog open={showPicker} onClose={() => setShowPicker(false)} className="fixed inset-0 z-50 flex items-center justify-center">
                <DialogBackdrop className="fixed inset-0 bg-black/30" onClick={() => setShowPicker(false)} />
                <Picker onEmojiClick={handleEmojiSelect} lazyLoadEmojis={true} theme={Theme.DARK} customEmojis={customEmojis} style={{ border: 'none' }} />
            </Dialog>
        </div>
    );
};

export default NewSendMessageBox;
