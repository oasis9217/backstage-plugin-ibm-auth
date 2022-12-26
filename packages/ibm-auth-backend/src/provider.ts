import { providers } from '@backstage/plugin-auth-backend';
import {
    DEFAULT_NAMESPACE,
    stringifyEntityRef,
} from '@backstage/catalog-model';

export const ibmAuthProvider = providers.oidc.create({
    signIn: {
        resolver(info, ctx) {
            const userRef = stringifyEntityRef({
                kind: 'User',
                name: info.result.userinfo.sub as string,
                namespace: DEFAULT_NAMESPACE,
            });
            return ctx.issueToken({
                claims: {
                    sub: userRef, // The user's identity
                    ent: [userRef], // A list of identities that the user claims ownership through
                },
            });
        },
    },
});
