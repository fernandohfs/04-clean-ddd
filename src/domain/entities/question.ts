import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  slug: Slug;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> { }