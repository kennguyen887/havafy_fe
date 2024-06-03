import dynamic from 'next/dynamic';
import React from 'react';

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const Editor = ({
  defaultValue,
  handleEditorChange,
}: {
  defaultValue: string;
  handleEditorChange: (value: string) => void;
}) => {
  return (
    <SunEditor
      // setContents="My contents"
      defaultValue={defaultValue}
      onChange={(value) => {
        handleEditorChange(value);
      }}
      setDefaultStyle='height: auto'
      setOptions={{
        buttonList: [
          [
            'bold',
            'underline',
            'italic',
            'strike',
            'list',
            'align',
            'fontSize',
            'formatBlock',
            'table',
            'image',
          ],
        ],
      }}
    />
  );
};

export default Editor;
