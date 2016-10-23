using System;
namespace Modern.Models
{
    public abstract class EntityBase<TKey>  where TKey : IComparable
    {
        public virtual TKey Id { get; set;}
        public static bool operator ==(EntityBase<TKey> entity1, EntityBase<TKey> entity2)
        {
            return ReferenceEquals(entity1, entity2) || (((object)entity1 != null) && entity1.Equals(entity2));
        }
        public static bool operator !=(EntityBase<TKey> entity1, EntityBase<TKey> entity2)
        {
            return !(entity1 == entity2);
        }

        public override bool Equals(object obj)
        {
            var entity = obj as EntityBase<TKey>;

            return (entity != null) && (entity.GetType() == this.GetType()) && (entity.Id.CompareTo(this.Id) ==0);
        }
        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }

        public override string ToString()
        {
            return this.Id.ToString();
        }
    }
}