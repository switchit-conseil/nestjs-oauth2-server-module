import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('gb_oauth_client')
@Unique(['clientId'])
export class ClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text', nullable: false})
    name: string;

    @Column({name: 'client_id', type: 'text', nullable: false})
    clientId: string;

    @Column({name: 'client_secret', type: 'text', nullable: true})
    clientSecret: string;

    @Column({
        name: 'grants',
        type: 'simple-array',
        nullable: false,
        default: 'client_credentials,refresh_token'
    })
    grants: string[];

    /**
     * Client scope. The scope should contain the list of third party applications
     * the client has access to
     */
    @Column({length: 500, nullable: false})
    scope: string;

    @Column({name: 'access_token_lifetime', nullable: false, default: 3600})
    accessTokenLifetime: number;

    @Column({name: 'refresh_token_lifetime', nullable: false, default: 7200})
    refreshTokenLifetime: number;

    @Column({type: 'text', nullable: false})
    privateKey: string;

    @Column({type: 'text', nullable: false})
    publicKey: string;

    @Column({type: 'text', nullable: false})
    cert: string;

    @Column({type: 'timestamp', name: 'cert_expires_at', nullable: false})
    certExpiresAt: Date;

    @Column({type: 'timestamp', name: 'created_at', nullable: false, default: () => 'now()'})
    createdAt: Date;

    @Column({type: 'timestamp', name: 'deleted_at', nullable: true})
    deletedAt: Date;
}
