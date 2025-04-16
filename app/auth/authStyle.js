import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5EFE7',
      },
      keyboardView: {
        flex: 1,
      },
      scrollView: {
        flexGrow: 1,
        paddingBottom: 24,
      },
      logoContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
      },
      logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#4F709C',
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      },
      formContainer: {
        paddingHorizontal: 24,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 32,
      },
      formInner: {
        width: '100%',
      },
      forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
      },
      inputContainer: {
        marginBottom: 16,
      },
      inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 6,
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        height: 48,
      },
      inputError: {
        borderColor: '#EF4444',
      },
      inputIcon: {
        paddingLeft: 12,
      },
      input: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        color: '#111827',
        fontSize: 16,
      },
      eyeIcon: {
        paddingRight: 12,
      },
      errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
      },
      statusError: {
        color: '#EF4444',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
      },
      registerButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
      },
      registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
      },
      divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
      },
      dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#4F709C',
      },
      dividerText: {
        paddingHorizontal: 16,
        color: '#6B7280',
        fontSize: 14,
      },
      socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        height: 48,
        marginBottom: 16,
      },
      socialButtonText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 12,
      },
      footer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
      },
      footerText: {
        fontSize: 14,
        color: '#4B5563',
      },
      linkText: {
        color: '#3B82F6',
        fontWeight: '500',
      },
});