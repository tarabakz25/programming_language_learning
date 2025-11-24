# Supabase Schema

## section_progress テーブル

セクションの学習進捗を管理するテーブルです。

### テーブル定義

```sql
CREATE TABLE section_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  section TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, language, section)
);

CREATE INDEX idx_section_progress_user_language ON section_progress(user_id, language);
CREATE INDEX idx_section_progress_user ON section_progress(user_id);
```

### カラム説明

- `id`: 主キー（UUID）
- `user_id`: ユーザーID（auth.usersテーブルへの外部キー）
- `language`: プログラミング言語（例: "python", "rust"）
- `section`: セクションのスラッグ（例: "variables", "ownership"）
- `status`: 進捗ステータス
  - `not_started`: 未着手
  - `in_progress`: 進行中
  - `completed`: 完了
- `updated_at`: 最終更新日時

### RLS (Row Level Security) ポリシー

ユーザーは自分の進捗データのみアクセス可能にします。

```sql
ALTER TABLE section_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress"
  ON section_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON section_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON section_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress"
  ON section_progress FOR DELETE
  USING (auth.uid() = user_id);
```

