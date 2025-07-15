-- Schema for JASIT Consultan E-Commerce Application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  features JSONB DEFAULT '[]'::JSONB
);

-- User Profiles Table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT,
  phone TEXT,
  company TEXT,
  address TEXT
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending',
  total FLOAT NOT NULL,
  contact_info JSONB NOT NULL,
  notes TEXT
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  price FLOAT NOT NULL,
  quantity INTEGER NOT NULL,
  image_url TEXT
);

-- RLS Policies for Security

-- Products: Anyone can read, only authenticated users can create/update/delete
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Profiles: Users can only read/update their own profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Orders: Users can only see their own orders, authenticated users can create orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Order Items: Users can only see their own order items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Sample Data (Optional)
INSERT INTO products (name, description, price, category, image_url, features)
VALUES 
  ('Website Development', 'Jasa pembuatan website profesional untuk bisnis Anda. Kami menawarkan solusi website yang responsif, cepat, dan SEO friendly untuk meningkatkan kehadiran online bisnis Anda.', 5000000, 'web', 'https://placehold.co/600x400/3B82F6/FFFFFF/png?text=Website', '["Responsive Design", "SEO Friendly", "CMS Integration", "Custom Domain", "1 Year Support"]'),
  
  ('Mobile App Development', 'Jasa pembuatan aplikasi mobile Android dan iOS yang menarik dan fungsional. Kami membantu Anda mengembangkan aplikasi yang sesuai dengan kebutuhan bisnis dan pengguna Anda.', 8000000, 'mobile', 'https://placehold.co/600x400/10B981/FFFFFF/png?text=Mobile+App', '["Native Performance", "Cross Platform", "Push Notification", "User Authentication", "API Integration"]'),
  
  ('UI/UX Design', 'Jasa desain antarmuka pengguna yang menarik dan user-friendly. Kami membantu Anda menciptakan pengalaman pengguna yang optimal untuk meningkatkan engagement dan konversi.', 3000000, 'design', 'https://placehold.co/600x400/F59E0B/FFFFFF/png?text=UI/UX', '["User Research", "Wireframing", "Prototyping", "User Testing", "Design System"]'),
  
  ('IT Consulting', 'Layanan konsultasi IT untuk membantu bisnis Anda mengoptimalkan teknologi. Kami memberikan saran strategis untuk meningkatkan efisiensi dan keamanan sistem IT Anda.', 2500000, 'consulting', 'https://placehold.co/600x400/6366F1/FFFFFF/png?text=Consulting', '["Technology Assessment", "Digital Transformation", "IT Strategy", "Security Audit", "Performance Optimization"]'),
  
  ('E-Commerce Development', 'Jasa pembuatan toko online yang menarik dan fungsional. Kami membantu Anda mengembangkan platform e-commerce yang sesuai dengan kebutuhan bisnis Anda.', 6000000, 'web', 'https://placehold.co/600x400/EC4899/FFFFFF/png?text=E-Commerce', '["Product Catalog", "Secure Payment", "Order Management", "Customer Accounts", "Analytics Integration"]');

-- Create a function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
