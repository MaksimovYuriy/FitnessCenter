using System.Security.Cryptography;
using System.Text;

namespace FitnessCenterAPI.Services
{
    internal static class PassConverter
    {
        public static string Convert(string input)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(input);
            using (SHA256 sha = SHA256.Create())
            {
                byte[] hashBytes = sha.ComputeHash(bytes);
                string result = BitConverter.ToString(hashBytes).Replace("-", "");
                return result;
            }
        }
    }
}
