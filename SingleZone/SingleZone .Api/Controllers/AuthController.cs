
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SingleZone.Api.PostModales;
using SingleZone.Core.DTOs;
using SingleZone.Core.Interfaces.ServiceInterface;
using SingleZone.Service;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SingleZone.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AuthService _authService;
        private readonly IUsersService _userService;
        private readonly IMapper _mapper;
        IUserRoleService _userRoleService;
        public AuthController(IConfiguration configuration, AuthService authService, IUsersService userService, IMapper mapper, IUserRoleService userRoleService)
        {
            _configuration = configuration;
            _authService = authService;
            _userService = userService;
            _mapper = mapper;
            _userRoleService = userRoleService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            var roleName = await _userService.AuthenticateAsync(model.username, model.Password);
            if (roleName == "Admin")
            {
                var token = _authService.GenerateJwtToken(model.username, new[] { "Admin" });
                return Ok(new { Token = token });
            }        
            else if (roleName == "User")
            {
                var token = _authService.GenerateJwtToken(model.username, new[] { "Viewer" });
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                return Conflict("User is not valid");
            }
            var modelD = _mapper.Map<UserDto>(model);
            var existingUser =  _userService.AddUser(modelD);
            if (existingUser == null)
                return BadRequest();
            var userRole = await _userRoleService.AddAsync(model.RoleName, existingUser.Id);
            if (userRole == null)
                return BadRequest();
            var token = _authService.GenerateJwtToken(model.Name, new[] { model.RoleName });
            return Ok(new { Token = token });


        }
      
    }
    public class LoginModel
    {
        public string username { get; set; }
        public string Password { get; set; }
    }
}

