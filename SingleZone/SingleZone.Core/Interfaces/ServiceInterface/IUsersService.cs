using SingleZone.Core.DTOs;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
    public interface IUsersService
    {
        List<UserDto> GetList();         // מחזיר את כל רשימת המשתמשים ב-DTO
        UserDto GetById(int id);         // מחזיר משתמש לפי מזהה כ-DTO
        public UserDto AddUser(UserDto userDto);
        bool Update(int id, UserDto userDto);  // מעדכן משתמש קיים ב-DTO
        bool Remove(int id);  // מסיר משתמש לפי מזהה

        public Task<string> AuthenticateAsync(string username, string password);
    }
}
