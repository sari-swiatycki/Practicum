﻿//using System;
//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.EntityFrameworkCore;
//using SingleZone.Core.entities;

//using SingleZone.Core.Interfaces;
//using SingleZone.Data;



//namespace SingleZone.Data.Repository
//{
//    public class UsersRepository : IRepository<Users>
//    {
//        private readonly DataContext _context;

//        public UsersRepository(DataContext context)
//        {
//            _context = context;
//        }

//        public List<Users> GetAll()
//        {
//            return _context.UsersList.ToList();
//        }
//        public Users Add(Users user)
//        {
//            try
//            {
//               _context.UsersList.Add(user);
//               _context.SaveChanges();
//                return user;
//            }
//            catch (Exception)
//            {
//                return null;
//            }
//        }

//        public Users GetById(int id)
//        {
//            return _context.UsersList.FirstOrDefault(u => u.Id == id);
//        }

//        public int GetIndexById(int id)
//        {
//            return _context.UsersList.ToList().FindIndex(u => u.Id == id);
//        }



//        public bool Update(Users user, int id)
//        {

//            var existingUser = _context.UsersList.FirstOrDefault(c => c.Id == id);
//            if (existingUser == null) return false;


//            existingUser.UserName = user.UserName;
//            existingUser.Password = user.Password;
//            existingUser.Email = user.Email;


//            try
//            {
//                 _context.SaveChanges();
//                return true;
//            }
//            catch
//            {
//                return false;
//            }
//        }


//        public  bool Delete(int id)
//        {
//            var category = _context.UsersList.FirstOrDefault(c => c.Id == id);
//            if (category == null) return false;

//            try
//            {
//                _context.UsersList.Remove(category);
//                _context.SaveChanges();
//                return true;
//            }
//            catch
//            {
//                return false;
//            }

//        }
//        public async Task<Users> FindByUsernameAsync(string username)
//        {
//            return await _context.UsersList.SingleOrDefaultAsync(u => u.UserName == username);
//        }
//    }
//}



















using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using SingleZone.Data;

namespace SingleZone.Data.Repository
{
    public class UsersRepository : IUserRepository, IRepository<Users>  // הוספת IUserRepository כאן
    {
        private readonly DataContext _context;

        public UsersRepository(DataContext context)
        {
            _context = context;
        }

        public List<Users> GetAll()
        {
            return _context.UsersList.ToList();
        }

        public Users Add(Users user)
        {
            try
            {
                _context.UsersList.Add(user);
                _context.SaveChanges();
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Users GetById(int id)
        {
            return _context.UsersList.FirstOrDefault(u => u.Id == id);
        }

        public int GetIndexById(int id)
        {
            return _context.UsersList.ToList().FindIndex(u => u.Id == id);
        }

        public bool Update(Users user, int id)
        {
            var existingUser = _context.UsersList.FirstOrDefault(c => c.Id == id);
            if (existingUser == null) return false;

            existingUser.UserName = user.UserName;
            existingUser.Password = user.Password;
            existingUser.Email = user.Email;

            try
            {
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            var category = _context.UsersList.FirstOrDefault(c => c.Id == id);
            if (category == null) return false;

            try
            {
                _context.UsersList.Remove(category);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // מימוש המתודה של IUserRepository
        public async Task<Users> FindByUsernameAsync(string username, string password)
        {
            // מחפש את המשתמש על פי שם המשתמש והסיסמה
            return await _context.UsersList
                .SingleOrDefaultAsync(u => u.UserName == username && u.Password == password);
        }





    }
}
