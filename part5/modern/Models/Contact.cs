using System;
namespace Modern.Models
{
    public class Contact : EntityBase<int>, IEntity<int>
    {
        public override int Id { get; set;}
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set;}
        public DateTime? BirthDate { get; set;}
    }
}