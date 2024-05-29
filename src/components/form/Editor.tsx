import dynamic from 'next/dynamic';
import React from 'react';

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const Editor = ({ defaultValue }: { defaultValue: string }) => {
  const handleEditorChange = (content: string) => {
    // eslint-disable-next-line no-console
    console.log(content);
  };

  return (
    <SunEditor
      // setContents="My contents"
      defaultValue={defaultValue}
      onChange={handleEditorChange}
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
