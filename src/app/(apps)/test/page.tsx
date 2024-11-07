import { Activity, File, Mail, User } from "lucide-react";
export default function Authorize() {
  return (
    <>
      <div className="bg-gray-50">
        <div className="flex flex-col items-center justify-center max-w-[1000px] mx-auto  h-screen">
          <p className="text-[24px]">
            Vercel by <span className="text-blue-500">Vercel</span> would like
            permission to:
          </p>
          <div className="border w-[500px] bg-white p-4 space-y-[20px] mt-3">
            <div className="flex items-center text-sm text-gray-700">
              <User className="size-[30px] mr-3" />
              <p>
                Verify your GitHub identity <span>SanqDuonq</span>
              </p>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <File className="size-[30px] mr-3" />
              <p>Know which resource you can access</p>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Activity className="size-[30px] mr-3" />
              <p>Act on your behalf</p>
            </div>
            <p className="text-[16px] font-medium border-b py-3">
              Resources on your account
            </p>
            <div className="flex items-center text-sm text-gray-700 border-b pb-4">
              <Mail className="size-[40px] mr-3" />
              <div>
                <p className="text-[16px] text-black font-medium">
                  Email Addresses
                </p>
                <p className="text-[12px] text-gray-700">
                  View your email address
                </p>
              </div>
            </div>
            <div className="w-full flex gap-x-[10px]">
              <button className="w-1/2 bg-gray-100 border-[1px] border-gray-400 rounded-[6px] py-[5px] px-[12px] text-sm font-medium">
                Cancel
              </button>
              <button className="w-1/2 bg-blue-700 border-[1px] border-green-800 py-[5px] px-[12px] text-white text-sm font-medium rounded-[6px]">
                Authorize
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
