using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Modern.Infrastructure;
using Modern.Models;

namespace modern.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private IGenericRepository<Contact, int> _contactsRepository;
        public ContactsController (IGenericRepository<Contact, int> contactsRepository)
        {
          _contactsRepository = contactsRepository;
        }
        // GET api/values
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_contactsRepository.GetAll());
        }    

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var contact = _contactsRepository.Get(id);
            if(contact == null) {
                return NotFound(contact);
            }
            else {
                return Ok(contact);
            }
        }

        [HttpPost]
        public IActionResult Add([FromBody] Contact contact) 
        {            
            _contactsRepository.Add(contact);
            return Ok(contact);
        } 
        [HttpPost]
        [RouteAttribute("search")]
        public IActionResult Search([FromBody] string keyword) 
        {            
            var contacts = _contactsRepository.Search(keyword);
            if(contacts != null)
            {
                return Ok(contacts);
            }
            else{
                return NotFound("Search yielded no results");
            }            
        } 

        [HttpDelete]  
        public IActionResult Delete([FromBody] DeletePayload payload) 
        {
            _contactsRepository.Delete(payload.id);
            return new NoContentResult();
        } 

        [HttpPut]
        public IActionResult Edit([FromBody] Contact contact)
        {
            _contactsRepository.Edit(contact);
            return Ok(contact);
        }

    }
}
