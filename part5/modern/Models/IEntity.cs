using System;
namespace Modern.Models
{
    public interface IEntity<TKey> where TKey: IComparable
    {
        TKey Id { get; set;}
    }
}