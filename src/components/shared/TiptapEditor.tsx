import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Focus } from '@tiptap/extension-focus';
import { Typography } from '@tiptap/extension-typography';
import { Box, Group, Button, ActionIcon, Divider, Select, ColorInput, Modal, TextInput, FileInput, Stack, Image as MantineImage, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
  IconQuote,
  IconSeparator,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
  IconTable,
  IconTablePlus,
  IconTableMinus,
  IconLink,
  IconPhoto,
  IconHighlight,
  IconSubscript,
  IconSuperscript,
  IconCodeDots,
  IconUpload
} from '@tabler/icons-react';

// Removed lowlight configuration for now to avoid complexity

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
  editable?: boolean;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start typing...',
  height = 400,
  editable = true
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [linkModalOpened, { open: openLinkModal, close: closeLinkModal }] = useDisclosure(false);
  const [imageModalOpened, { open: openImageModal, close: closeImageModal }] = useDisclosure(false);
  const [linkUrl, setLinkUrl] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'tiptap-image',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount,
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      Typography,
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addLink = useCallback(() => {
    if (linkUrl) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      setLinkUrl('');
      closeLinkModal();
    }
  }, [editor, linkUrl, closeLinkModal]);

  const addImage = useCallback(() => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      closeImageModal();
    }
  }, [editor, imageUrl, closeImageModal]);

  const addImageFromFile = useCallback(() => {
    if (selectedFile && imagePreview) {
      editor?.chain().focus().setImage({ src: imagePreview }).run();
      setSelectedFile(null);
      setImagePreview(null);
      closeImageModal();
    }
  }, [editor, selectedFile, imagePreview, closeImageModal]);

  const handleCloseImageModal = () => {
    setImageUrl('');
    setSelectedFile(null);
    setImagePreview(null);
    closeImageModal();
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  if (!isMounted || !editor) {
    return (
      <Box
        style={{
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          minHeight: height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        Loading editor...
      </Box>
    );
  }

  return (
    <Box>
      {/* Toolbar */}
      <Box
        style={{
          border: '1px solid #e9ecef',
          borderBottom: 'none',
          borderRadius: '8px 8px 0 0',
          padding: '8px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Group gap="xs" wrap="wrap">
          {/* Undo/Redo */}
          <ActionIcon
            variant={editor.can().undo() ? 'light' : 'subtle'}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <IconArrowBackUp size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.can().redo() ? 'light' : 'subtle'}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <IconArrowForwardUp size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Text Formatting */}
          <ActionIcon
            variant={editor.isActive('bold') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <IconBold size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive('italic') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <IconItalic size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive('underline') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <IconUnderline size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive('strike') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <IconStrikethrough size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive('code') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <IconCode size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Headings */}
          <ActionIcon
            variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <IconH1 size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive('heading', { level: 2 }) ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <IconH2 size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive('heading', { level: 3 }) ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <IconH3 size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Lists */}
          <ActionIcon
            variant={editor.isActive('bulletList') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <IconList size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive('orderedList') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <IconListNumbers size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Alignment */}
          <ActionIcon
            variant={editor.isActive({ textAlign: 'left' }) ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <IconAlignLeft size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive({ textAlign: 'center' }) ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <IconAlignCenter size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive({ textAlign: 'right' }) ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <IconAlignRight size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive({ textAlign: 'justify' }) ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          >
            <IconAlignJustified size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Text Color & Highlight */}
          <ColorInput
            size="xs"
            w={40}
            value={editor.getAttributes('textStyle').color || '#000000'}
            onChange={(color) => editor.chain().focus().setColor(color).run()}
            swatches={['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']}
          />
          <ActionIcon
            variant={editor.isActive('highlight') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <IconHighlight size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Subscript/Superscript */}
          <ActionIcon
            variant={editor.isActive('subscript') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleSubscript().run()}
          >
            <IconSubscript size={16} />
          </ActionIcon>
          <ActionIcon
            variant={editor.isActive('superscript') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
          >
            <IconSuperscript size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Quote */}
          <ActionIcon
            variant={editor.isActive('blockquote') ? 'filled' : 'light'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <IconQuote size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Table */}
          <ActionIcon
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          >
            <IconTable size={16} />
          </ActionIcon>
          {editor.isActive('table') && (
            <>
              <ActionIcon
                onClick={() => editor.chain().focus().addRowBefore().run()}
              >
                <IconTablePlus size={16} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().deleteRow().run()}
              >
                <IconTableMinus size={16} />
              </ActionIcon>
            </>
          )}

          <Divider orientation="vertical" />

          {/* Link & Image */}
          <ActionIcon
            variant={editor.isActive('link') ? 'filled' : 'light'}
            onClick={openLinkModal}
          >
            <IconLink size={16} />
          </ActionIcon>
          <ActionIcon onClick={openImageModal}>
            <IconPhoto size={16} />
          </ActionIcon>

          <Divider orientation="vertical" />

          {/* Horizontal Rule */}
          <ActionIcon
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <IconSeparator size={16} />
          </ActionIcon>
        </Group>
      </Box>

      {/* Editor Content */}
      <Box
        style={{
          border: '1px solid #e9ecef',
          borderRadius: '0 0 8px 8px',
          minHeight: height,
          maxHeight: height * 2,
          overflow: 'auto',
        }}
      >
        <EditorContent
          editor={editor}
          style={{
            padding: '16px',
            minHeight: height - 32,
          }}
        />
      </Box>

      {/* Character Count */}
      {editor.extensionManager.extensions.find(ext => ext.name === 'characterCount') && (
        <Box mt="xs" style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>
          {editor.storage.characterCount.characters()} characters, {editor.storage.characterCount.words()} words
        </Box>
      )}

      {/* Link Modal */}
      <Modal opened={linkModalOpened} onClose={closeLinkModal} title="Add Link">
        <TextInput
          label="URL"
          placeholder="https://example.com"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          mb="md"
        />
        <Group justify="flex-end">
          <Button variant="light" onClick={closeLinkModal}>
            Cancel
          </Button>
          <Button onClick={addLink} disabled={!linkUrl}>
            Add Link
          </Button>
        </Group>
      </Modal>

      {/* Image Modal */}
      <Modal opened={imageModalOpened} onClose={handleCloseImageModal} title="Add Image" size="md">
        <Stack gap="md">
          {/* URL Input */}
          <TextInput
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          
          {/* File Upload */}
          <FileInput
            label="Or upload from your computer"
            placeholder="Choose image file"
            accept="image/*"
            value={selectedFile}
            onChange={handleFileSelect}
            leftSection={<IconUpload size={16} />}
          />
          
          {/* Image Preview */}
          {imagePreview && (
            <Box>
              <Text size="sm" mb="xs">Preview:</Text>
              <MantineImage
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                radius="md"
              />
            </Box>
          )}
          
          <Group justify="flex-end">
            <Button variant="light" onClick={handleCloseImageModal}>
              Cancel
            </Button>
            {imageUrl && (
              <Button onClick={addImage}>
                Add from URL
              </Button>
            )}
            {selectedFile && imagePreview && (
              <Button onClick={addImageFromFile}>
                Upload Image
              </Button>
            )}
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
};

export default TiptapEditor;
