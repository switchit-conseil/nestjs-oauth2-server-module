import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ClientEntity} from "./client.entity";
import {OAuth2Request} from "../ui";

@Entity('gb_oauth_access_token')
export class AccessTokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        name: 'access_token',
        primary: true,
        nullable: false,
        length: 80
    })
    accessToken: string;

    @Column({
        name: 'refresh_token',
        unique: true,
        nullable: false,
        length: 80
    })
    refreshToken: string;

    @Column('timestamp', {name: 'access_token_expires_at', nullable: false})
    accessTokenExpiresAt: Date;

    @Column('timestamp', {name: 'refresh_token_expires_at', nullable: false})
    refreshTokenExpiresAt: Date;

    @ManyToOne(type => ClientEntity, {nullable: false})
    @JoinColumn({name: 'client_id', referencedColumnName: 'id'})
    client: ClientEntity;

    @Column({nullable: true})
    userId: string;

    /**
     * JSON List of api IDs granted with this token for the client
     */
    @Column({nullable: true, length: 500})
    scope: string;

    @Column('timestamp', {name: 'created_on', nullable: false, default: () => 'now()'})
    createdAt: Date;

    @Column({name: 'created_from', type: 'jsonb', nullable: true})
    createdFrom: OAuth2Request;
}
