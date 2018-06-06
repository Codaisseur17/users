import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { IsString, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'

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
    @Column("text", {nullable: false})
    email: string

    @IsString()
    @Column("text", {nullable: false})
    @Exclude({ toPlainOnly: true })
    password: string

    async hashPassword(rawPassword: string) {
        const hash = await bcrypt.hash(rawPassword, 10)
        this.password = hash
    }
    
    validatePassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password)
    }

    @Column("boolean", {nullable: false, default: true})
    isTeacher: boolean

}