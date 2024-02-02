export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          cover_img_url: string | null;
          created_at: string;
          description: string | null;
          id: number;
          name: string;
          publisher: string | null;
          writter: string | null;
          name_writter: string | null;
          name_writter_publisher: string | null;
          search: string | null;
        };
        Insert: {
          cover_img_url?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          name: string;
          publisher?: string | null;
          writter?: string | null;
        };
        Update: {
          cover_img_url?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
          publisher?: string | null;
          writter?: string | null;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          book_id: number;
          comment: string;
          created_at: string;
          email: string;
          id: number;
          user_id: string;
          username: string;
        };
        Insert: {
          book_id: number;
          comment: string;
          created_at?: string;
          email: string;
          id?: number;
          user_id: string;
          username: string;
        };
        Update: {
          book_id?: number;
          comment?: string;
          created_at?: string;
          email?: string;
          id?: number;
          user_id?: string;
          username: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_book_id_fkey";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "books";
            referencedColumns: ["id"];
          }
        ];
      };
      likes: {
        Row: {
          book_id: number;
          created_at: string;
          email: string | null;
          id: number;
          user_id: string;
        };
        Insert: {
          book_id: number;
          created_at?: string;
          email?: string | null;
          id?: number;
          user_id: string;
        };
        Update: {
          book_id?: number;
          created_at?: string;
          email?: string | null;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "likes_book_id_fkey";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "books";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      name_writter: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      name_writter_publisher: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      search: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
