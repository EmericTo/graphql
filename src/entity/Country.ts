import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType() 
@Entity()
export class Country extends BaseEntity {
    @Field(() => ID)  
    @PrimaryColumn()
    code!: string;

    @Field() 
    @Column()
    name!: string;

    @Field() 
    @Column()
    emoji!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    continentCode?: string;
}
