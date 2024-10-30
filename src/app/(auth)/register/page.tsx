import RegisterForm from "@/app/(auth)/register/register-form";
import HeroSection from "../../../components/common/hero-section";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full mx-auto p-8 md:p-12 bg-white border-gray-300 rounded-xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <HeroSection />
          <div>
            <h1 className="text-2xl font-bold text-center text-[#0D99FF] mb-4">
              Đăng ký
            </h1>
            <p className="text-center text-gray-600 font-medium mb-6">
              Tạo tài khoản của bạn ngay hôm nay!
            </p>
            <div className="">
              <RegisterForm />
              <h1 className="text-sm text-center mt-5 font-semibold text-gray-500">
                Bạn đã có tài khoản?
                <a className="text-blue-500 pl-2" href="/login">
                  Đăng nhập
                </a>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
