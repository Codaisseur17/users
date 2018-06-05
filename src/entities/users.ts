import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { IsString, IsEmail } from 'class-validator';

@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column("text", {default: null})
    firstName: string

    @IsString()
    @Column("text", {default: null})
    lastName: string
    
    @IsEmail()
    @Column("text", {default: null})
    email: string

    @IsString()
    @Column("text", {default: null})
    password: string

    @Column("boolean", {nullable: false})
    isTeacher: boolean

}
