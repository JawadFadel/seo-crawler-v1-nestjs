import { IsString, IsDateString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Seo {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ nullable: true })
  @IsString()
  title?: string;
  @IsString()
  @Column({ nullable: true })
  addressCountry?: string;
  @IsString()
  @Column({ nullable: true })
  addressLocality?: string;
  @IsString()
  @Column({ nullable: true })
  postalCode?: string;
  @IsString()
  @Column({ nullable: true })
  streetAddress?: string;
  @IsString()
  @Column({ nullable: true })
  description?: string;
  @IsDateString()
  @Column({ nullable: true })
  date?: Date;
  @IsString()
  @Column({ nullable: true })
  image?: string;
  @IsString()
  @Column({ nullable: true })
  logo?: string;
  @IsString()
  @Column({ nullable: true })
  publisher?: string;
  @IsString()
  @Column({ nullable: true })
  topics?: string;
  @IsString()
  @Column({ nullable: true })
  video?: string;
  @IsString()
  @Column({ nullable: true })
  country?: string;
  @IsString()
  @Column({ nullable: true })
  url?: string;
  @IsString()
  @Column({ nullable: true })
  lang?: string;
  @IsString()
  @Column({ nullable: true })
  author?: string;
  @IsString()
  @Column({ nullable: true })
  keywords?: string;
  @IsString()
  @Column({ nullable: true })
  feed?: string;
}
