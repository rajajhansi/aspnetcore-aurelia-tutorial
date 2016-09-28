using System;
using System.Collections.Generic;
using System.Linq;
using Modern.Models;
namespace Modern.Infrastructure
{
    public class ContactsRepository : InMemoryRepository<Contact, int>
    {
        public ContactsRepository ()
        {
          DbSet = new List<Contact> {
              new Contact { Id = 1, FirstName ="Raja", LastName = "Mani", Email = "rmani@gmail.com", PhoneNumber = "408-973-5050", BirthDate = new DateTime(1973, 5, 1) },
              new Contact { Id = 2, FirstName ="Jhansi", LastName = "Rani", Email = "jrani@gmail.com", PhoneNumber = "408-900-9875", BirthDate = new DateTime(1973, 5, 24) },
              new Contact { Id = 3, FirstName ="Aditi", LastName = "Raja", Email = "araja@gmail.com", PhoneNumber = "408-973-9006", BirthDate = new DateTime(2001, 10, 12) },
              new Contact { Id = 4, FirstName ="Mahati", LastName = "Raja", Email = "mraja@gmail.com", PhoneNumber = "408-973-8007", BirthDate = new DateTime(2006, 2, 15) }
          };
        }

        public override void Save(Contact contact)
        {
            var contactIndex = DbSet.FindIndex((c) => c.Id.CompareTo(contact.Id) == 0);
            if(contactIndex >= 0)
            {
                DbSet[contactIndex] = contact;
            }
            else
            {
                DbSet.Add(contact);
            }   
        }

        public override void Add(Contact contact)
        {
            contact.Id = DbSet.Max(c => c.Id) + 1;
            base.Add(contact);
        }

        public override Contact[] Search(string keyword)
        {
            var contact = DbSet.FindAll((c) => (c.FirstName.Contains(keyword) || c.LastName.Contains(keyword)) ).ToArray();
            return contact;
        }
    }
}