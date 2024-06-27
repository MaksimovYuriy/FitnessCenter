using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace TestHash
{
    internal static class PassConverter
    {
        public static string Convert(string input)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(input);
            using(SHA256 sha = SHA256.Create())
            {
                byte[] hashBytes = sha.ComputeHash(bytes);
                string result = BitConverter.ToString(hashBytes).Replace("-", "");
                return result;
            }
        }
    }
}
