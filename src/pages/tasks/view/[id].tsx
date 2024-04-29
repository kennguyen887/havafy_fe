import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import TaskDetail from '@/components/tasks/TaskDetail';

export default function RegisterPage() {
  return (
    <Layout>
      <Seo
        templateTitle='Danh sách công việc'
        description='a selection of 100% natural sounding AI voices in 60 languages to make professional voice over for your videos and presentations.'
      />

      <main>
        <TaskDetail />
      </main>
    </Layout>
  );
}
