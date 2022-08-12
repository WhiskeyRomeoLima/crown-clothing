import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'
const Authentication = () => {

  //returns the sign in with the google option and a form allowing the new user to sign up.
  return (
    <div>
      <h1>Sign In Page</h1>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;

/*
UserCredentialImpl {user: UserImpl, providerId: 'google.com', _tokenResponse: {…}, operationType: 'signIn'}
operationType: "signIn"
providerId: "google.com"
//*user: UserImpl
accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2M2E3Y2E0M2MzYzc2MDM2NzRlZGE0YmU5Nzcy... 
auth: AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, config: {…}, currentUser: UserImpl, emulatorConfig: null, …}
//*displayName: "William Lucas"
//*email: "wrlucas67@gmail.com"
emailVerified: true
isAnonymous: false
metadata: UserMetadata {createdAt: '1660145790074', lastLoginAt: '1660158140712', lastSignInTime: 'Wed, 10 Aug 2022 19:02:20 GMT', creationTime: 'Wed, 10 Aug 2022 15:36:30 GMT'}
phoneNumber: null
photoURL: "https://lh3.googleusercontent.com/a/AItbvmncPlfKfO9wLbUlqY4MuJ56PmFhPdBr984mmaeD=s96-c"
proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
providerData: [{…}]
providerId: "firebase"
reloadListener: null
reloadUserInfo: {localId: '7Myc47Fos6bj8Uc1Jnb2jpeRPJo2', email: 'wrlucas67@gmail.com', displayName: 'William Lucas', photoUrl: 'https://lh3.googleusercontent.com/a/...}
stsTokenManager: StsTokenManager {refreshToken: 'AOEOulYlc5kcuivJtdBRTLwZOhW8AWgz8JpHLUF6VN879PsnB_…
tenantId: null
//*uid: "7Myc47Fos6bj8Uc1Jnb2jpeRPJo2"

*/