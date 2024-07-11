```ruby
module Wet
  class Model
    def save
      # common code to save a model to a DB
    end
  end

  class Cat < Model
    def save
      super # call Model#save implementation

      puts "Cat saved!" # perform Cat-specific post-save logic
    end
  end

  class Dog < Model
    def save
      super # call Model#save implementation

      puts "Dog saved!" # perform Dog-specific post-save logic
    end
  end
end

module Dry
  class Model
    def self.save_callbacks
      @save_callbacks ||= []
    end

    # define a macro to *register* (record) a post-save *callback* (a
    # method to be called after another method completes)
    def self.save_callback(method_name)
      self.save_callbacks << method_name
    end

    def save
      # common code to save a model to a DB

      run_save_callbacks
    end

    private
    def run_save_callbacks
      self.class.save_callbacks.each do |method_name|
        # invoke the method named `method_name`
        send(method_name)
      end
    end
  end

  class Cat < Model
    save_callback :print_cat_saved

    private
    def print_cat_saved
      puts "Cat saved!" # perform Cat-specific post-save logic
    end
  end

  class Dog < Model
    save_callback :print_dog_saved

    private
    def print_dog_saved
      puts "Dog saved!" # perform Dog-specific post-save logic
    end
  end
end
```